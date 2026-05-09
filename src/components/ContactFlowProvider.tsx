import { createContext, useContext, useState, ReactNode } from "react";
import AuthModal, { getStoredUser, type AuthUser } from "./AuthModal";
import ProjectModal from "./ProjectModal";

type Ctx = {
  openProjectFlow: () => void;
};

const ContactFlowContext = createContext<Ctx | null>(null);

export const useContactFlow = () => {
  const c = useContext(ContactFlowContext);
  if (!c) throw new Error("useContactFlow must be used within ContactFlowProvider");
  return c;
};

export const ContactFlowProvider = ({ children }: { children: ReactNode }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());

  const openProjectFlow = () => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setProjectOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <ContactFlowContext.Provider value={{ openProjectFlow }}>
      {children}
      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        intent="project"
        onAuthed={(u) => {
          setUser(u);
          setProjectOpen(true);
        }}
      />
      <ProjectModal open={projectOpen} onOpenChange={setProjectOpen} user={user} />
    </ContactFlowContext.Provider>
  );
};
