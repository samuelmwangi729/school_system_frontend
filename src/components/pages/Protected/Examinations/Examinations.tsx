import React, { useEffect, useState } from 'react';
import { getData, putData } from '../../../../utils/useAxios';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserDetails } from '../../../../redux/userSlice';

export type statusTypes  = 'active' | 'suspended' | 'deleted'
type ExamType = {
  id: number;
  institution: string;
  created_by: string;
  exam_name: string;
  exam_status: statusTypes;
};

const Examinations: React.FC = () => {
  const [exams, setExams] = useState<ExamType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector(selectUserDetails)

  const fetchExams = async () => {
    try {
      const response = await getData('/exams');
      setExams(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch exams.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExams();
  }, []);

  const updateStatus = async (exam: ExamType, action: 'active' | 'suspended' | 'deleted') => {
    try {
      const finalData = {
        institution_name:exam.institution,
        username: user?.username,
        exam_status: action
      }
      const res = await putData(`/exam/${exam.exam_name}`,
        finalData
      );
      if (res.status === 'success') {
        toast.success('Exam status updated');
      } else {
        toast.error(res.message);
      }
      fetchExams()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update exam status');
    }
  };

  const statusBadge = (status: ExamType['exam_status']) => {
    const base = 'text-xs font-semibold px-2 py-1 rounded-full';
    switch (status) {
      case 'active':
        return <span className={`${base} bg-green-100 text-green-700`}>Active</span>;
      case 'suspended':
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Suspended</span>;
      case 'deleted':
        return <span className={`${base} bg-red-100 text-red-700`}>Deleted</span>;
      default:
        return null;
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Examinations</h2>

      {loading && <p className="text-blue-500 text-center animate-pulse">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && exams.length === 0 && (
        <p className="text-gray-500 text-center">No exams found.</p>
      )}

      {!loading && exams.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Institution</th>
                <th className="px-4 py-3 text-left">Exam Name</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                  <td className="px-4 py-3 font-medium">{exam.institution}</td>
                  <td className="px-4 py-3">{exam.exam_name}</td>
                  <td className="px-4 py-3">{exam.created_by}</td>
                  <td className="px-4 py-3">{statusBadge(exam.exam_status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateStatus(exam, 'active')}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                        disabled={exam.exam_status === 'active'}
                      >
                        Activate
                      </button>
                      <button
                        onClick={() => updateStatus(exam, 'suspended')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                        disabled={exam.exam_status === 'suspended'}
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => updateStatus(exam, 'deleted')}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Examinations;
