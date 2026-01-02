import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { fetchPgById, updatePg, createPg } from "../slices/pg-slice";

export default function PgForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, errors } = useSelector((state) => {
    return state.pg;
  });

  const initialValues = {
    pgname: "",
    description: "",
    rent: "",
    gender: "",
    location: {
      address: "",
      coordinates: {
        latitude: "",
        longitude: ""
      }
    },
    roomTypes: [
      {
        roomType: "",
        count: "",
        rent: "",
      },
    ],
    amenities: [],
    pgPhotos: [],
    pgCertificate: null,
  };

  const validate = (values) => {
    const errors = {};

    if(!values.pgname) errors.pgname = "PG name is required";
    if(!values.location.address) {
      errors.location = { address: "Address is required" };
    }
    if(!values.location.coordinates.latitude) {
      errors.location = {
        ...errors.location,
        coordinates: { latitude: "Latitude is required"}
      };
    }
    if(!values.location.coordinates.longitude) {
      errors.location = {
        ...errors.location,
        coordinates: { longitude: "Longitude is required" },
      };
    }
    if(!values.pgCertificate) {
      errors.pgCertificate = "PG Certificate is required";
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append("pgname", values.pgname);
    formData.append("description", values.description);

    formData.append("location[address]", values.location.address);
    formData.append(
      "location[coordinates][latitude]",
      values.location.coordinates.latitude
    );
    formData.append(
      "location[coordinates][longitude]",
      values.location.coordinates.longitude
    );

    values.roomTypes.forEach((room, index) => {
      formData.append(`roomTypes[${index}][roomType]`, room.roomType);
      formData.append(`roomTypes[${index}][count]`, room.count);
      formData.append(`roomTypes[${index}][rent]`, room.rent);
    });

    values.amenities.forEach((a) => formData.append("amenities[]", a));

    values.pgPhotos.forEach((file) => {
      formData.append("pgPhotos", file);
    });

    formData.append("pgCertificate", values.pgCertificate);

    dispatch(createPg(formData)).then(() => navigate("/dashboard"));
    setSubmitting(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1> Add PG </h1>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit} >
        {({ values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <label> PG Name </label>
            <Field name="pgname" />
            <ErrorMessage name="pgname" component="div" />

            <label> Description </label>
            <Field as="textarea" name="description" />

            <h3> Location </h3>
            <Field name="location.address" placeholder="Address" />
            <ErrorMessage name="location.address" component="div" />

            <Field name="location.coordinates.latitude" placeholder="Latitude" />
            <Field name="location.coordinates.longitude" placeholder="Longitude" />

            <h3> Room Types </h3>
            <FieldArray name="roomTypes">
              {({ push, remove }) => (
                <>
                  {values.roomTypes.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name={`roomTypes[${index}].roomType`}
                        placeholder="Room Type (Single / Double)"
                      />

                      <Field
                        name={`roomTypes[${index}].count`}
                        type="number"
                        placeholder="Count"
                      />

                      <Field
                        name={`roomTypes[${index}].rent`}
                        type="number"
                        placeholder="Rent"
                      />

                      {values.roomTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          style={{ marginLeft: "10px" }}
                        >
                          ❌ Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push({ roomType: "", count: "", rent: "" })}
                  >
                    ➕ Add Room Type
                  </button>
                </>
              )}
            </FieldArray>

            <h3> Amenities </h3>
            {["wifi", "food", "laundry"].map((amenity) => (
              <label key={amenity} style={{ display: "block" }}>
                <input
                  type="checkbox" 
                  checked={values.amenities.includes(amenity)} 
                  onChange={(e) => 
                    setFieldValue(
                      "amenities", 
                      e.target.checked 
                        ? [...values.amenities, amenity] 
                        : values.amenities.filter((a) => a !== amenity)
                    )
                  } 
                />
                { amenity }
              </label>
            ))}

            <h3> PG Photos </h3>
            <input 
              type="file" 
              multiple
              accept="image/*"
              onChange={(e) =>
                setFieldValue("pgPhotos", Array.from(e.target.files))
              }
            />

            <h3> PG Certificate </h3>
            <input 
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setFieldValue("pgCertificate", e.target.files[0])
              }
            />
            <ErrorMessage name="pgCertificate" component="div" />

            { errors && <p style={{ color: "red" }}> { JSON.stringify(errors) } </p> }

            <button type="submit" disabled={loading}>
              { loading ? "Creating..." : "Create PG" }
            </button>
          </Form>
        )}
      </Formik>

      <br />

      <Link to="/dashboard">
        <button> Back to Dashboard </button>
      </Link>

    </div>
  );
}