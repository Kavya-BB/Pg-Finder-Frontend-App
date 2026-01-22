import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { createPg } from "../slices/pg-slice";
import "../styles/pg-form.css";

export default function PgForm() {

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
    <div className="page">
      <div className="pg-form-card">
        <div className="pg-form-header">
          <h1>Add New PG</h1>
          <p>Fill accurate details to get faster approval</p>
        </div>

        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data" className="pg-form">

              <section className="form-section">
                <h3>🏠 PG Information</h3>

                <label>PG Name</label>
                <Field name="pgname" placeholder="Ex: Sunrise Men's PG" />
                <ErrorMessage name="pgname" component="div" className="error" />

                <label>Description</label>
                <Field as="textarea" name="description" placeholder="Describe your PG..." />
              </section>

              <section className="form-section">
                <h3>📍 Location</h3>

                <Field name="location.address" placeholder="Full Address" />
                <ErrorMessage name="location.address" component="div" className="error" />

                <div className="two-col">
                  <Field name="location.coordinates.latitude" placeholder="Latitude" />
                  <Field name="location.coordinates.longitude" placeholder="Longitude" />
                </div>
              </section>

              <section className="form-section">
                <h3>🛏 Room Types</h3>

                <FieldArray name="roomTypes">
                  {({ push, remove }) => (
                    <>
                      {values.roomTypes.map((_, index) => (
                        <div key={index} className="room-card">
                          <Field
                            name={`roomTypes[${index}].roomType`}
                            placeholder="Room Type (Single / Double)"
                          />
                          <Field
                            name={`roomTypes[${index}].count`}
                            type="number"
                            placeholder="Rooms"
                          />
                          <Field
                            name={`roomTypes[${index}].rent`}
                            type="number"
                            placeholder="Rent (₹)"
                          />

                          {values.roomTypes.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger small"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => push({ roomType: "", count: "", rent: "" })}
                      >
                        ➕ Add Another Room Type
                      </button>
                    </>
                  )}
                </FieldArray>
              </section>

              <section className="form-section">
                <h3>✨ Amenities</h3>

                <div className="amenities-grid">
                  {["wifi", "food", "laundry"].map((amenity) => (
                    <label key={amenity} className="amenity-chip">
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
                      {amenity}
                    </label>
                  ))}
                </div>
              </section>

              <section className="form-section">
                <h3>📷 PG Photos</h3>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("pgPhotos", Array.from(e.target.files))
                  }
                />

                <h3>📄 PG Certificate</h3>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFieldValue("pgCertificate", e.target.files[0])
                  }
                />
                <ErrorMessage name="pgCertificate" component="div" className="error" />
              </section>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating PG..." : "Create PG"}
                </button>

                <Link to="/dashboard">
                  <button type="button" className="btn btn-outline">
                    Cancel
                  </button>
                </Link>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
}