import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ConnectWallet } from '@thirdweb-dev/react'
import Link from 'next/link'

export default function MainNav() {
    return (
      <header className="py-2 sm:py-6">
        <NavigationMenu>
          <NavigationMenuList className='flex flex-cols'>
            <div  >
              <Link href="/attestations" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Attestations
                </NavigationMenuLink>
              </Link>
              <Link href="/requests" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Requests
                </NavigationMenuLink>
              </Link>
              <Link href="/portfolio" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Portfolio
                </NavigationMenuLink>
              </Link>
              <Link href="/recipes" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Recipes
                </NavigationMenuLink>
              </Link>
            </div>
            <ConnectWallet />
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    )
}
