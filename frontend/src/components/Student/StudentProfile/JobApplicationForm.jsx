import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = ({ job, onClose }) => {
    const student = JSON.parse(sessionStorage.getItem("student"));

    const [formData, setFormData] = useState({
        student_name: student?.name || '',
        college_name: student?.college || '',
        form: job.form.map(field => ({
            field_name: field.field_name,
            value: ''
        }))
    });

    const handleChange = (e, fieldName) => {
        const { value, type, files } = e.target;

        if (type === "file") {
            // For file inputs, directly handle file change
            setFormData(prevState => {
                const updatedForm = prevState.form.map(field => {
                    if (field.field_name === fieldName) {
                        return { ...field, value: files[0] }; // Store the file itself
                    }
                    return field;
                });
                return { ...prevState, form: updatedForm };
            });
        } else {
            // For other input types (text, email, etc.)
            setFormData(prevState => {
                const updatedForm = prevState.form.map(field => {
                    if (field.field_name === fieldName) {
                        return { ...field, value };
                    }
                    return field;
                });
                return { ...prevState, form: updatedForm };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Build the `form` array as JSON
        const formArray = formData.form.map(field => ({
            field_name: field.field_name,
            value: field.value instanceof File ? field.value.name : field.value, // Use file name if it's a file
        }));

        // Append non-file fields
        formDataToSend.append('form', JSON.stringify(formArray));
        formDataToSend.append('student_name', formData.student_name);
        formDataToSend.append('college_name', formData.college_name);
        formDataToSend.append('company', job.company);
        formDataToSend.append('company_id', job.company_id);
        formDataToSend.append('job_position', job.title);
        formDataToSend.append('status', 'Submitted');
        formDataToSend.append('job_id', job.id);

        // Append files separately
        formData.form.forEach(field => {
            if (field.value instanceof File) {
                formDataToSend.append(field.field_name, field.value);
            }
        });

        try {
            const response = await axios.post('https://cultrang-hackathon-project.onrender.com/job-applications', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit application.');
        }
    };


    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-xl font-semibold mb-4">Apply for {job.title} at {job.company}</h3>
                <form onSubmit={handleSubmit}>
                    {job.form.map((field, idx) => (
                        <div key={idx} className="mb-4">
                            <label htmlFor={field.field_name} className="block text-sm font-medium text-gray-700">
                                {field.field_name}{field.is_required ? '*' : ''}
                            </label>
                            {field.field_type === 'text' || field.field_type === 'email' || field.field_type === 'number' || field.field_type === 'date' ? (
                                <input
                                    type={field.field_type}
                                    id={field.field_name}
                                    name={field.field_name}
                                    value={formData.form.find(f => f.field_name === field.field_name)?.value || ''}
                                    onChange={(e) => handleChange(e, field.field_name)}
                                    required={field.is_required}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            ) : field.field_type === 'file' ? (
                                <input
                                    type="file"
                                    id={field.field_name}
                                    name={field.field_name}
                                    onChange={(e) => handleChange(e, field.field_name)}
                                    required={field.is_required}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            ) : field.field_type === 'dropdown' ? (
                                <select
                                    id={field.field_name}
                                    name={field.field_name}
                                    value={formData.form.find(f => f.field_name === field.field_name)?.value || ''}
                                    onChange={(e) => handleChange(e, field.field_name)}
                                    required={field.is_required}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                >
                                    {field.options.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : null}
                        </div>
                    ))}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationForm;
