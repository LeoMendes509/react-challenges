import React from "react";
// Importa o "Compositor" que tem Auth, Theme e Notification dentro
import { AppProviders } from "../../../providers/Challenge12/AppProviders";
import MultiContextView from "../../../components/Challenges/Level_Advanced/Challenge12/MultiContextView";

const Challenge12Page = () => {
  return (
    <AppProviders>
      <MultiContextView />
    </AppProviders>
  );
};

export default Challenge12Page;
