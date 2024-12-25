import { Button } from "@mui/material";

interface SubmitButtonProps {
  onClick: (e: React.FormEvent) => void;
  name: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, name }) => (
  <div className="flex w-full justify-center">
    <Button
      variant="contained"
      type="submit"
      onClick={onClick}
      sx={{
        height: "40px",
        width: "200px",
      }}
    >
      {name}
    </Button>
  </div>
);

export default SubmitButton;
