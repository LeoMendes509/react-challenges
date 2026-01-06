import { useState } from "react";

function RegistrationForm({ onSubmit }) {
  // Um único estado com TODOS os campos
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    terms: false,
  });

  // Controla se o usuário já mexeu em cada campo
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    age: false,
    terms: false,
  });

  // Validações simples
  const validations = {
    name: form.name.length >= 3,
    email: form.email.includes("@"),
    age: Number(form.age) > 0 && /^\d+$/.test(form.age),
    terms: form.terms,
  };

  // Só é válido se todas forem true
  const isValid = Object.values(validations).every(Boolean);

  // Atualiza qualquer campo
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    setTouched({
      ...touched,
      [name]: true,
    });
  }

  // Enter pula pro próximo campo
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const fields = Array.from(e.target.form.elements);
      const index = fields.indexOf(e.target);
      fields[index + 1]?.focus();
    }
  }

  // Envio do formulário
  function handleSubmit(e) {
    e.preventDefault();
    // marca todos os campos como tocados
    setTouched({
      name: true,
      email: true,
      age: true,
      terms: true,
    });
    if (isValid) {
      onSubmit(form); // envia os dados para o componente pai
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Cadastro</h1>

      {/* Nome */}
      <div className="field">
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="error">
          {touched.name && !validations.name && "Min. 3 caracteres"}
        </div>
      </div>

      {/* Email */}
      <div className="field">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="error">
          {touched.email && !validations.email && "Email inválido"}
        </div>
      </div>

      {/* Idade */}
      <div className="field">
        <input
          name="age"
          type="number"
          placeholder="Idade"
          value={form.age}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="error">
          {touched.age && !validations.age && "Idade > 0 (só números)"}
        </div>
      </div>

      {/* Termos */}
      <label className="checkbox">
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        Aceito os termos
      </label>
      <div className="error">
        {touched.terms &&
          !validations.terms &&
          "Você precisa aceitar os termos"}
      </div>

      {/* Botão só ativa se tudo estiver válido */}
      <button disabled={!isValid}>Cadastrar</button>
    </form>
  );
}

export default RegistrationForm;
