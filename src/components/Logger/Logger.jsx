import { useHistory } from "react-router-dom";

function Logger({ isLoggedIn, setIsLoggedIn, value, setValue }) {
  const history = useHistory();

  !isLoggedIn && history.push("/");

  function returnButton() {
    setIsLoggedIn(false);
    setValue({});
    history.push("/");
  }

  return (
    <div>
      <div>
        <h1>Bem Vindo, {value.username} !</h1>
        <h3>Nome: {value.name}</h3>
        <h3>Email: {value.email}</h3>
        <h3>Cadastrado com Sucesso!</h3>
      </div>
      <button onClick={returnButton} className="btn btn-primary">
        Sair
      </button>
    </div>
  );
}

export default Logger;
