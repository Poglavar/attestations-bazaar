import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

export default function MainNav() {
    return (
        <header>
            <NavigationMenu>
                <NavigationMenuList>
                    <Link href="/attestations" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Attestations
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/requests" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Requests
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/portfolio" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Portfolio
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/recipes" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Recipes
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
