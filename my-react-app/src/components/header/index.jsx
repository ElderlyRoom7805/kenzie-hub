export const HeaderComponent = ({ buttonText, onClick }) => {
    return(
        <header>
            <h1>kenzie Hub</h1>
            { buttonText ? <button onClick={onClick}>{buttonText}</button> : null}
        </header>
    )
}