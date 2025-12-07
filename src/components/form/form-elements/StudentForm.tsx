"use client";
import React, {useEffect, useState} from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon } from '../../../icons';
import { Gender, GradeStatus } from "@/lib/types/constant";
import Button from "@/components/ui/button/Button";
import { getUsers } from '@/lib/api/user';

interface StudentFormProps {
  onSubmit: (data: { name: string; grade: string; gender: Gender, gradeStatus: GradeStatus, musyrif: string }) => void;
  initialData?: {
    name: string;
  };
  mode?: 'add' | 'edit';
}

interface Options {
  value: string;
  label: string;
}

export default function StudentForm({ onSubmit, initialData, mode = 'add' }: StudentFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [grade, setGrade] = useState('');
  const [musyrifId, setMusyrifId] = useState('');
  const [gender, setGender] = useState<Options[]>([]);
  const [musyrif, setMusyrif] = useState<Options[]>([]);
  const [gradeStatus, setGradeStatus] = useState<Options[]>([]);
  const [genderId, setGenderId] = useState(Gender.L);
  const [gradeStatusId, setGradeStatusId] = useState(GradeStatus.ELEMENTARY_SCHOOL);
  const [, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, grade, gender: genderId, gradeStatus: gradeStatusId, musyrif: musyrifId });
  };

  const loadGender = async () => {
    setLoading(true);
    try {
      const res = [
        {
          value: Gender.L,
          label: 'Laki-laki',
        },
        {
          value: Gender.P,
          label: 'Perempuan',
        }
      ]
      setGender(res);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  }

  const loadGradeStatus = async () => {
    setLoading(true);
    try {
      const res = [
        {
          value: GradeStatus.ELEMENTARY_SCHOOL,
          label: 'Elementary School',
        },
        {
          value: GradeStatus.JUNIOR_HIGH_SCHOOL,
          label: 'Junior High School',
        },
        {
          value: GradeStatus.SENIOR_HIGH_SCHOOL,
          label: 'Senior High School',
        }
      ]
      setGradeStatus(res);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  }

  const loadMusyrif = async () => {
      setLoading(true);
      try {
        const res = await getUsers('musyrif');
        const options = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        setMusyrif(options);
      } catch (err) {
        console.error('Failed to load user data:', err);
      } finally {
        setLoading(false);
      }
    }

  const handleGenderChange = (value: string) => {
    console.log("Selected value:", value);
    setGenderId(value as Gender);
  };

  const handleGradeStatusChange = (value: string) => {
    console.log("Selected value:", value);
    setGradeStatusId(value as GradeStatus);
  };

  const handleMusyrifChange = (value: string) => {
    console.log("Selected value:", value);
    setMusyrifId(value);
  };

  useEffect(() => {
    loadGender();
    loadGradeStatus();
    loadMusyrif();
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);
  return (
    <ComponentCard title={mode === 'add' ? 'Add Student' : 'Edit Student'}>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name={name}
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <div className="relative">
            <Select
              options={gender}
              onChange={handleGenderChange}
              defaultValue={Gender.L}
              className="dark:bg-dark-900"
              required={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
          </div>
        </div>

        <div>
        <Label>Grade</Label>
        <Input
          type="number"
          name={grade}
          min='1'
          max='6'
          onChange={e => setGrade(e.target.value)}
          required
        />
        </div>

        <div>
          <Label>Grade Status</Label>
          <div className="relative">
            <Select
              options={gradeStatus}
              onChange={handleGradeStatusChange}
              defaultValue={GradeStatus.ELEMENTARY_SCHOOL}
              className="dark:bg-dark-900"
              required={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
          </div>
        </div>

        <div>
          <Label>Musyrif</Label>
            <div className="relative">
            <Select
              options={musyrif}
              onChange={handleMusyrifChange}
              defaultValue={musyrifId}
              className="dark:bg-dark-900"
              required={true}
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
              </span>
            </div>
        </div>

        </div>
        <div className="justify-self-end">
          <Button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {mode === 'add' ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
