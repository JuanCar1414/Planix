import './NavBar.css';

export default function NavBar() {
    return (
        <>
            <div class='NavBar'>
                <input type="radio" id="menu-1" name="menu" />
                <label for="menu-1">Home</label>

                <input type="radio" id="menu-2" name="menu" />
                <label for="menu-2">Perfil</label>

                <input type="radio" id="menu-3" name="menu" />
                <label for="menu-3">Calendário</label>

                <input type="radio" id="menu-4" name="menu" />
                <label for="menu-4">Financeiro</label>
            </div>
        </>

    );
}