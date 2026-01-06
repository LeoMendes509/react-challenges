import React from "react";

const ContactCard = ({ contact, onDelete, onEdit }) => {
  return (
    <tr className="contact-row">
      {/* Coluna 1: Avatar e Nome */}
      <td>
        <div className="contact-summary">
          <div className="avatar-circle">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="contact-details">
            <span className="contact-name">{contact.name}</span>
            <span className="contact-role">{contact.category}</span>
          </div>
        </div>
      </td>

      <td className="contact-email">{contact.email}</td>
      <td className="contact-phone">{contact.phone}</td>
      <td className="contact-location">Washington, United States</td>

      {/* Coluna 5: Ações */}
      <td className="contact-actions">
        {/* Botão Editar - Passa o OBJETO inteiro para o pai preencher o form */}
        <button
          className="btn-icon edit"
          onClick={() => onEdit(contact)}
          title="Editar contato"
        >
          ✏️
        </button>

        {/* Botão Deletar - Passa apenas o ID */}
        <button
          className="btn-icon delete"
          onClick={() => onDelete(contact.id)}
          title="Eliminar contato"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default ContactCard;
