import "./Card.css";

function Card({ title, variant = "default", children, ...rest }) {
  return (
    <div className={`ui-card ${variant}`} {...rest}>
      <h3>{title}</h3>
      <div className="ui-card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
