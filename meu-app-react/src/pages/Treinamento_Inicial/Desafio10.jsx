import { useState } from "react";
import SearchBar from "../../components/Challenges/Treinamento_Inicial/Desafio10/SearchBar";
import ContactList from "../../components/Challenges/Treinamento_Inicial/Desafio10/ContactList";
import ContactForm from "../../components/Challenges/Treinamento_Inicial/Desafio10/ContactForm";
import CategoryFilter from "../../components/Challenges/Treinamento_Inicial/Desafio10/CategoryFilter";
import "../../components/Challenges/Treinamento_Inicial/Desafio10/Desafio10.css";

const Desafio10 = () => {
  // 1. Gera 25 contatos iniciais para popular a tabela
  const initialContacts = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    name: `Contato Exemplo ${index + 1}`,
    email: `contato${index + 1}@email.com`,
    phone: `(14) 9${8000 + index}-0000`,
    category: index % 2 === 0 ? "Work" : "Personal",
  }));

  // 2. Estados Globais
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingContact, setEditingContact] = useState(null); // Null = Criando, Objeto = Editando

  // 3. Lógica de Filtragem (Nome + Categoria)
  const filteredContacts = contacts.filter((contact) => {
    const matchesName = contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || contact.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  // 4. Salvar Contato (Criação ou Edição)
  const handleSaveContact = (formData) => {
    if (editingContact) {
      // Edição: Substitui o contato antigo pelo atualizado mantendo o ID
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id ? { ...formData, id: c.id } : c
        )
      );
    } else {
      // Criação: Gera novo ID e adiciona ao final
      const lastId = contacts.length > 0 ? contacts[contacts.length - 1].id : 0;
      const newContact = { ...formData, id: lastId + 1 };
      setContacts([...contacts, newContact]);
    }
    closeModal();
  };

  // 5. Excluir Contato
  const deleteContact = (id) => {
    if (window.confirm("Deseja mesmo excluir este contato?")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  // 6. Funções do Modal
  const startEditing = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const startCreating = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="container-desafio10">
      <header className="header-page">
        <h2>People & Organizations</h2>
        <button className="btn-add" onClick={startCreating}>
          Add Person
        </button>
      </header>

      <section className="search-section">
        <SearchBar onSearch={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            {/* O 'key' força o React a recriar o form quando mudamos de contato */}
            <ContactForm
              key={editingContact ? editingContact.id : "new"}
              onSave={handleSaveContact}
              onCancel={closeModal}
              initialData={editingContact}
            />
          </div>
        </div>
      )}

      <section className="list-section">
        <ContactList
          contacts={filteredContacts}
          onDelete={deleteContact}
          onEdit={startEditing}
        />
        <p style={{ marginTop: "10px", color: "#6b7280" }}>
          Total: {filteredContacts.length} contatos
        </p>
      </section>
    </div>
  );
};

export default Desafio10;
