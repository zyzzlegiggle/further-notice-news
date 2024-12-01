// general template page (for news viewing only)

import { AuthorizeView, GetUser } from "../util/authorizeview";
import LogoutLink from "../util/logoutlink";

function Page({ children, addClass="" }) {
    return (
        /*<AuthorizeView>
            <section className={`container mx-auto py-8 px-16 ${addClass}`}>
                {children}
            </section>
            <LogoutLink>Logout <GetUser value="email" /></LogoutLink>
        </AuthorizeView>*/
        <section className={`container mx-auto py-8 px-16 ${addClass}`}>
            {children}
        </section>
    );
}

export default Page;