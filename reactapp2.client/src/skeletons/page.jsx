// general template page (for news viewing only, currently for logged in user)
//test
import { AuthorizeView, GetUser } from "../util/authorizeview";
import LogoutLink from "../util/logoutlink";

function Page({ children, addClass="" }) {
    return (
        <section className={`container mx-auto py-8 px-16 ${addClass}`}>
            <AuthorizeView>
                {children}
            </AuthorizeView>
        </section>
        /*<section className={`container mx-auto py-8 px-16 ${addClass}`}>
            no authorize view
            {children}
        </section>*/

    );
}

export default Page;