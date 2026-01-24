import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPgById } from "../slices/pg-slice";
import PgForm from "./PgForm";

export default function EditPg() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPg, loading } = useSelector(state => state.pg);

  useEffect(() => {
    dispatch(fetchPgById(id));
  }, [id]);

  if (loading || !selectedPg) {
    return <p>Loading PG details...</p>;
  }

  return (
    <PgForm
      isEdit={true}
      pgData={selectedPg}
      pgId={id}
    />
  );
}
