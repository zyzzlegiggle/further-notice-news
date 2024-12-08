// general template page (for news viewing only, currently for logged in user)
//test
import { AuthorizeView, GetUser } from "../util/authorizeview";
import LogoutLink from "../util/logoutlink";

function Page({ children, addClass="" }) {
    return (
        <AuthorizeView>
            <section className={`container mx-auto py-8 px-16 ${addClass}`}>
                {children}
            </section>
        </AuthorizeView>
        /*<section className={`container mx-auto py-8 px-16 ${addClass}`}>
            no authorize view
            {children}
        </section>*/

    );
}

export default Page;