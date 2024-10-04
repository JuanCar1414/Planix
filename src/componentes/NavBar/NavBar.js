import './NavBar.css';

export default function NavBar() {
    return (
        <>
            <div class='NavBar'>
                <input type="radio" id="menu-1" name="menu" defaultChecked='true' />
                <label for="menu-1">Calendário</label>

                <input type="radio" id="menu-4" name="menu" />
                <label for="menu-4">Financeiro</label>
            </div>
        </>

    );
}