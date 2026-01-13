import { Link } from "react-router-dom";

export default function EditPg() {
    return (
        <div>
            <h1> Edit PG </h1>

            <div>
                {/* <Link to={`/pg-details/:id`}> */}
                <Link to={``}>
                    <button> Back to pg </button>
                </Link>
            </div>

            <div>
                <Link to="/dashboard">
                    <button> Back to Dashboard </button>
                </Link>
            </div>
        </div>
    )
}