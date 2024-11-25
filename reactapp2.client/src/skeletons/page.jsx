// general template page

import { AuthorizeView } from "../util/authorizeview";

function Page({ children, addClass="" }) {
    return (
        <AuthorizeView>
            <section className={`container mx-auto py-8 px-16 ${addClass}`}>
                {children}
            </section>
            <div>logout</div>
        </AuthorizeView>
        
    );
}

export default Page;