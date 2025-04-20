export const loadServices = () => {
    try {
      return JSON.parse(localStorage.getItem('services')) || {};
    } catch {
      return {};
    }
  };
  
  export const saveServices = (obj) => {
    localStorage.setItem('services', JSON.stringify(obj));
  };
  