import "./ProfileCard.css";
import avatarLeo from "../../../../assets/avatar-leo.png";

function ProfileCard({ name, email, role = "Developer", avatar = avatarLeo }) {
  return (
    <div className="profile-card">
      <img src={avatar} alt={name} className="profile-avatar" />

      <div className="profile-info">
        <h2>{name}</h2>
        <p className="role">{role}</p>
        <p className="email">{email}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
