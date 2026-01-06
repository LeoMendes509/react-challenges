import { useState } from "react";

const ContactForm = ({ onSave, onCancel, initialData }) => {
  // Inicializa o estado com dados existentes (Edição) ou vazios (Criação)
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      category: "Personal",
    }
  );

  // Atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Valida e envia os dados
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("O nome é obrigatório!");
      return;
    }
    onSave(formData);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Editar Contato" : "Novo Contato"}</h3>

      <div className="form-group">
        <label>Nome</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Ana Silva"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(XX) 9XXXX-XXXX"
        />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-save">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
