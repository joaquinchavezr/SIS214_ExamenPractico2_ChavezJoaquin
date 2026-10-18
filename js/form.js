/**
 * form.js — Formulario de contacto interactivo.
 *
 * Usa la API de validación nativa de HTML5 (required, minlength, type="email",
 * pattern, validity) y la complementa con:
 *   - evento "input": validación en tiempo real con mensajes visuales;
 *   - evento "submit": event.preventDefault() para evitar la recarga de la página.
 */

/** Traduce el estado de validez nativo a un mensaje legible. */
const getErrorMessage = (field) => {
  const { validity } = field;
  if (validity.customError) return field.validationMessage;
  if (validity.valueMissing) return 'Este campo es obligatorio.';
  if (validity.typeMismatch || validity.patternMismatch) return 'Ingresa un correo electrónico válido.';
  if (validity.tooShort) return `Escribe al menos ${field.minLength} caracteres.`;
  if (validity.tooLong) return `Máximo ${field.maxLength} caracteres.`;
  return field.validationMessage;
};

export const initContactForm = () => {
  const form = document.getElementById('contact_form');
  const status = document.getElementById('form_status');
  if (!form || !status) return;

  const fields = [...form.querySelectorAll('input, textarea')];

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = type ? `form_status is_${type}` : 'form_status';
  };

  const clearFieldState = (field) => {
    document.getElementById(`${field.id}_error`).textContent = '';
    field.removeAttribute('aria-invalid');
    field.classList.remove('is_valid');
  };

  /** Valida un campo, actualiza su estado visual y devuelve true si es válido. */
  const validateField = (field) => {
    // Un campo obligatorio con solo espacios no cuenta como completado.
    const isBlank = field.required && field.value.trim() === '';
    field.setCustomValidity(isBlank ? 'Este campo es obligatorio.' : '');

    const isValid = field.checkValidity();
    document.getElementById(`${field.id}_error`).textContent = isValid ? '' : getErrorMessage(field);
    field.setAttribute('aria-invalid', String(!isValid));
    field.classList.toggle('is_valid', isValid);
    return isValid;
  };

  // Validación en tiempo real mientras el usuario escribe.
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      validateField(field);
      if (status.textContent) setStatus('');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length > 0) {
      setStatus('Revisa los campos marcados antes de enviar.', 'error');
      invalidFields[0].focus();
      return;
    }

    // Demostración: no existe backend, así que el mensaje no se envía a ningún servidor.
    // Para un envío real se puede reemplazar este bloque por un fetch() a un servicio como Formspree.
    const name = form.elements.field_name.value.trim();
    form.reset();
    fields.forEach(clearFieldState);
    setStatus(`¡Gracias, ${name}! El formulario es válido (demostración: no se envía a ningún servidor).`, 'success');
  });
};
