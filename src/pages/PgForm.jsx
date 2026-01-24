import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { createPg, updatePg } from "../slices/pg-slice";
import "../styles/pg-form.css";

export default function PgForm({ isEdit = false, pgData = null, pgId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.pg);

  const initialValues = isEdit && pgData ? {
    pgname: pgData.pgname,
    description: pgData.description || "",
    location: {
      address: pgData.location.address,
      coordinates: {
        latitude: pgData.location.coordinates.latitude,
        longitude: pgData.location.coordinates.longitude
      }
    },
    roomTypes: pgData.roomTypes,
    amenities: pgData.amenities || [],
    pgPhotos: [],
    pgCertificate: null
  } : {
    pgname: "",
    description: "",
    location: {
      address: "",
      coordinates: {
        latitude: "",
        longitude: ""
      }
    },
    roomTypes: [{ roomType: "", count: "", rent: "" }],
    amenities: [],
    pgPhotos: [],
    pgCertificate: null
  };

  const validate = (values) => {
    const errors = {};
    if (!values.pgname) errors.pgname = "PG name is required";
    if (!values.location.address) {
      errors.location = { address: "Address is required" };
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("pgname", values.pgname);
    formData.append("description", values.description);
    formData.append("location[address]", values.location.address);
    formData.append("location[coordinates][latitude]",values.location.coordinates.latitude);
    formData.append("location[coordinates][longitude]",values.location.coordinates.longitude);
    values.roomTypes.forEach((room, index) => {
      formData.append(`roomTypes[${index}][roomType]`, room.roomType);
      formData.append(`roomTypes[${index}][count]`, room.count);
      formData.append(`roomTypes[${index}][rent]`, room.rent);
    });
    values.amenities.forEach((a) => formData.append("amenities[]", a));
    values.pgPhotos.forEach((file) => {
      formData.append("pgPhotos", file);
    });
    if (values.pgCertificate) {
      formData.append("pgCertificate", values.pgCertificate);
    }
    if (isEdit) {
      dispatch(updatePg({ id: pgId, formData }))
        .then(() => navigate("/dashboard"));
    } else {
      dispatch(createPg(formData))
        .then(() => navigate("/dashboard"));
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <div className="pg-form-card">
        <h1>{isEdit ? "Edit PG" : "Add New PG"}</h1>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data" className="pg-form">

              <label>PG Name</label>
              <Field name="pgname" />
              <ErrorMessage name="pgname" component="div" className="error" />

              <label>Description</label>
              <Field as="textarea" name="description" />

              <label>Address</label>
              <Field name="location.address" />

              <div className="two-col">
                <Field name="location.coordinates.latitude" placeholder="Latitude" />
                <Field name="location.coordinates.longitude" placeholder="Longitude" />
              </div>

              <FieldArray name="roomTypes">
                {({ push, remove }) => (
                  <>
                    {values.roomTypes.map((_, index) => (
                      <div key={index}>
                        <Field name={`roomTypes[${index}].roomType`} placeholder="Room Type" />
                        <Field name={`roomTypes[${index}].count`} type="number" placeholder="Rooms" />
                        <Field name={`roomTypes[${index}].rent`} type="number" placeholder="Rent" />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                    
                    <button type="button" onClick={() => push({ roomType: "", count: "", rent: "" })}>
                      Add Room
                    </button>
                  </>
                )}
              </FieldArray>

              <h3>Amenities</h3>
              {["wifi", "food", "laundry"].map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    checked={values.amenities.includes(a)}
                    onChange={(e) =>
                      setFieldValue(
                        "amenities",
                        e.target.checked
                          ? [...values.amenities, a]
                          : values.amenities.filter((x) => x !== a)
                      )
                    }
                  />
                  {a}
                </label>
              ))}

              <h3>PG Photos</h3>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setFieldValue("pgPhotos", Array.from(e.target.files))
                }
              />

              {!isEdit && (
                <>
                  <h3>PG Certificate</h3>
                  <input
                    type="file"
                    onChange={(e) =>
                      setFieldValue("pgCertificate", e.target.files[0])
                    }
                  />
                </>
              )}

              <button type="submit" disabled={loading}>
                {isEdit ? "Update PG" : "Create PG"}
              </button>

              <Link to="/dashboard">
                <button type="button">Cancel</button>
              </Link>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
