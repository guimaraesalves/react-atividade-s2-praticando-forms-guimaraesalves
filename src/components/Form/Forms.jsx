import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";

function Forms({ setIsLoggedIn, setValue }) {
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .max(30, "30 Caracteres no máximo")
      .min(6, "Mínimo de 6 Caracteres"),
    username: yup
      .string()
      .required("Username obrigatório")
      .max(18, "18 Caracteres no máximo")
      .min(4, "Mínimo de 4 Caracteres"),
    email: yup.string().required("Email inválido").email("email"),
    confirmEmail: yup
      .string()
      .required()
      .email()
      .oneOf([yup.ref("email")], "Email não confere."),

    password: yup
      .string()
      .required("Use Maiúsculas, minúsculas e caracteres espececiais. Mínimo 8")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
      ),
    confirmPassword: yup
      .string()
      .required("Repita a Senha.")
      .oneOf([yup.ref("password")], "As senhas não conferem."),
    checkbox: yup.boolean().oneOf([true], "Aceitar os termos"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (e) => {
    setIsLoggedIn(true);
    setValue(e);
    history.push("/logger");
  };

  // Fazer uma consulta na api utilizando esses dados
  // Enviar para uma api

  //console.log(errors);

  return (
    <div>
      <h1>Cadastre-se grátis</h1>

      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <div className="input-box">
          <input placeholder="Nome completo" {...register("name")} />
          {errors.name?.message}
          <input placeholder="Username" {...register("username")} />
          {errors.username?.message}
          <input placeholder="Email" {...register("email")} />
          {errors.email?.message} {/* encadeamento opcional */}
          <input
            placeholder="Confirme seu email"
            {...register("confirmEmail")}
          />
          {errors.confirmEmail && errors.confirmEmail.message}
          <input type="password" {...register("password")} />
          {errors.password && errors.password.message}
          <input
            placeholder="Confirme sua Senha"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && errors.confirmPassword.message}
        </div>

        <div className="checkbox">
          <input id="terms" type="checkbox" {...register("terms")} />
          <label htmlFor="terms">
            <p>Eu aceito os termos desta aplicação</p>
          </label>
          {errors.terms?.message}
        </div>

        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Forms;
