export const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const truncate = (input: string, length = 10) => input?.length > length ? `${input.substring(0, length)}...` : input;
