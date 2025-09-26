import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type{ CreateNoteData, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

export interface NoteFormProps {
  onSubmit: (data: CreateNoteData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as NoteTag[])
    .required('Tag is required'),
});

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo' as NoteTag,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm(); // Очищаємо форму після відправки
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h2 className={css.title}>Create New Note</h2>
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          type="text" 
          name="title" 
          className={css.input}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <span className={css.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content && (
          <span className={css.error}>{formik.errors.content}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select 
          id="tag" 
          name="tag" 
          className={css.select}
          value={formik.values.tag}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && formik.errors.tag && (
          <span className={css.error}>{formik.errors.tag}</span>
        )}
      </div>

      <div className={css.actions}>
        <button 
          type="button" 
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isLoading || !formik.isValid || formik.isSubmitting}
        >
          {isLoading ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;