import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { postData } from '../../../../utils/useAxios'
import { toast } from 'react-toastify'

type InstitutionType = {
  name: string
  subcounty: string
  county: string
  category: 'national' | 'extra_county' | 'county'
  institutionType: 'day' | 'boarding'
  studentGender: 'boys' | 'girls' | 'mixed'
}

const CreateInstitution: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset, setError
  } = useForm<InstitutionType>()

  const addInstitution: SubmitHandler<InstitutionType> = async (data) => {
    //post the data to the backend
    const response = await postData("/institutions", data)
    if (response.status === "success") {
      toast.success(response.message)
      reset()
    }
    if (response?.status === "error" && response.message) {
      Object.entries(response.message).forEach(([field, messages]: [field: any, messages: any]) => {
        messages.forEach((msg: any) => {
          setError(field, { type: "server", message: msg })
          toast.error(`${field}: ${msg}`);
        });
      });
    }

  }

  return (
    <section className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Create Institution</h2>

      <form onSubmit={handleSubmit(addInstitution)} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Institution Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Institution Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Institution name is required' })}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Nairobi High School"
          />
          {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
        </div>

        {/* Subcounty */}
        <div className="flex flex-col">
          <label htmlFor="subcounty" className="text-sm font-medium mb-1">
            Subcounty
          </label>
          <input
            id="subcounty"
            type="text"
            {...register('subcounty', { required: 'Subcounty is required' })}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.subcounty && <span className="text-sm text-red-600">{errors.subcounty.message}</span>}
        </div>

        {/* County */}
        <div className="flex flex-col">
          <label htmlFor="county" className="text-sm font-medium mb-1">
            County
          </label>
          <input
            id="county"
            type="text"
            {...register('county', { required: 'County is required' })}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {errors.county && <span className="text-sm text-red-600">{errors.county.message}</span>}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">
            School Category
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Category --</option>
            <option value="national">National</option>
            <option value="extra_county">Extra County</option>
            <option value="county">County</option>
          </select>
          {errors.category && <span className="text-sm text-red-600">{errors.category.message}</span>}
        </div>

        {/* Institution Type */}
        <div className="flex flex-col">
          <label htmlFor="institutionType" className="text-sm font-medium mb-1">
            Institution Type
          </label>
          <select
            id="institutionType"
            {...register('institutionType', { required: 'Institution type is required' })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Type --</option>
            <option value="day">Day</option>
            <option value="boarding">Boarding</option>
          </select>
          {errors.institutionType && (
            <span className="text-sm text-red-600">{errors.institutionType.message}</span>
          )}
        </div>

        {/* Student Gender */}
        <div className="flex flex-col">
          <label htmlFor="studentGender" className="text-sm font-medium mb-1">
            Student Gender
          </label>
          <select
            id="studentGender"
            {...register('studentGender', { required: 'Student gender is required' })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Gender --</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
            <option value="mixed">Mixed</option>
          </select>
          {errors.studentGender && (
            <span className="text-sm text-red-600">{errors.studentGender.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateInstitution
