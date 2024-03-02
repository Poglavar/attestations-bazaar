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
    <header className=" mb-8 py-2 sm:py-4">
      <NavigationMenu className="flex-cols items-between flex w-screen max-w-7xl">
        <NavigationMenuList>
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
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Portfolio
            </NavigationMenuLink>
          </Link>
          <Link href="/recipes" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Recipes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuList>
        <ConnectWallet />
      </NavigationMenu>
    </header>
  )
}
