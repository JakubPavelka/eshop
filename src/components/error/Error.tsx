import { resetItems } from "../../store/features/itemsSlice";
import "./Error.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  const dispatch = useAppDispatch();

  const handleClickHome = () => {
    dispatch(resetItems());
  };
  return (
    <div className="container">
      <div className="error-block">
        <h2>We are sorry, but this {text}.</h2>
        <p>
          If you need help, please feel free to contact us or come back to home
          page.
        </p>
        <div className="error-buttons">
          <Link onClick={handleClickHome} to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
