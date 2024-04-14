import { useState } from 'react';

export const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

  //Função que muda os dados
  const onChangeInputs = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const clearInputs = () => {
    setForm(initialState)
  }
  return {form, onChangeInputs, clearInputs}
};

