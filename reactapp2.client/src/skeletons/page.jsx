// general template page

function Page({ children, addClass="" }) {
    return (
        <section className={`container mx-auto py-8 px-16 ${addClass}`}>
            {children}
        </section>
    );
}

export default Page;