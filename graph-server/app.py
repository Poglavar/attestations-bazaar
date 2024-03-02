import random

import networkx as nx
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

class Attestation(BaseModel):
    attestor_of_truth: str = Field(..., description="The Ethereum address of the attestor of truth.")
    attestation: str = Field(..., description="The attestation made by the attestor of truth.")

class AttestationBundle(BaseModel):
    getAttestation: dict = Field(..., description="Metadata for the attestation.")
    attestations: list[Attestation] = Field(..., description="A list of attestations.")

class AttestationList(BaseModel):
    att_list: list[AttestationBundle] = Field(..., description="A list of attestation bundles.")
    n_prior: int = Field(50, description="The number of nodes to pre-weight.")
    damping: float = Field(0.8, description="The damping factor for PageRank.")

@app.get("/reputation/{ethereum_address}", summary="Calculate Reputation", tags=["Reputation"])
async def calculate_reputation(ethereum_address: str):
    """
    Calculate the reputation score of an Ethereum address.

    This endpoint retrieves the reputation score based on the PageRank algorithm applied to attestations.
    """
    reputation_score = await get_reputation_score(ethereum_address)
    if reputation_score is None:
        raise HTTPException(status_code=404, detail="Ethereum address not found")
    return {"ethereum_address": ethereum_address, "reputation_score": reputation_score}

@app.post("/recalculate/", summary="Recalculate Graph and Update Scores", tags=["Recalculation"])
async def recalculate_graph(attestations: AttestationList):
    """
    Recalculate the reputation graph and update the scores based on the provided attestations.

    This endpoint accepts a list of attestation bundles, recalculates the graph, and outputs updated PageRank scores.
    """
    output_csv_path = 'data_out/addr_pageranks.csv'
    att_list = attestations.att_list
    n_prior = attestations.n_prior
    damping = attestations.damping

    # Create DataFrame from attestation list
    df = pd.DataFrame(columns=['attester_of_truth', 'self_attester', 'attestation'])
    for att_bundle in att_list:
        for att in att_bundle['attestations']:
            df.loc[len(df.index)] = [att['attestor_of_truth'], att_bundle['getAttestation']['selfAttestor'], att['attestation']]

    # Prepare addresses for pre-weighting
    df1 = df[['attester_of_truth']].rename(columns={'attester_of_truth':'addr'})
    df2 = df[['self_attester']].rename(columns={'self_attester':'addr'})
    df_addr = pd.concat([df1, df2])

    # Sample and assign preweights
    ser_prior_addr = df_addr['addr'].sample(n_prior).values
    ser_prior_val = [.1 * random.randint(1,10) for _ in range(len(ser_prior_addr))]
    df_priors = pd.DataFrame({'addr': ser_prior_addr, 'score': ser_prior_val})
    dict_priors = dict(zip(ser_prior_addr, ser_prior_val))

    # Merge priors with addresses
    df_addr = df_addr.merge(df_priors, on='addr', how='left').fillna(0)

    # Compute attestation scores based on preweights
    df['attester_of_truth_rep'] = df["attester_of_truth"].map(dict_priors).fillna(0)
    df_tmp_group = df[df.attester_of_truth_rep > 0].groupby(by=['self_attester', 'attestation'])['attester_of_truth_rep'].max().reset_index()
    df_attestation_scores = df_tmp_group.rename(columns={'self_attester':'addr', 'attester_of_truth_rep':'attestation_score'})

    # Update priors with attestation scores
    df_updated_priors = pd.concat([df_attestation_scores[['addr', 'attestation_score']].rename(columns={'attestation_score':'score'}), df_priors]).groupby('addr').min().reset_index()

    # Create the attribution graph and calculate pagerank scores
    att_graph = nx.from_pandas_edgelist(df, source="attester_of_truth", target="self_attester", create_using=nx.DiGraph())
    personalization_vector = dict(zip(df_addr['addr'], df_addr['score']))
    pg_scores = nx.pagerank(att_graph, alpha=damping, personalization=personalization_vector)

    # Update scores with pagerank results
    df_score = df_addr.copy()
    df_score['score'] = df_score["addr"].map(pg_scores).fillna(0)

    # Output to CSV
    df_score.to_csv(output_csv_path, index=False)

    return {"message": "Graph recalculated and output generated"}



async def get_reputation_score(ethereum_address: str):
    df = pd.read_csv("./addr_pageranks.csv")
    score_row = df[df.addr == ethereum_address]
    if score_row.empty:
        return None
    score = score_row.iloc[0]['score']
    return score

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)