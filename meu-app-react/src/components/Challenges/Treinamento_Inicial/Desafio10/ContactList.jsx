import React from "react";
import ContactCard from "./ContactCard";

// Recebe a lista e as ações (delete e edit) para repassar aos itens
const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <div className="table-container">
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Localização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={onDelete}
                onEdit={onEdit} /* Repassando a função */
              />
            ))
          ) : (
            <tr>Nenhum contato encontrado.</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
