export const loadServices = () => {
    try {
      const obj = JSON.parse(localStorage.getItem('services')) || {};
      if (obj.isPlug === undefined) {
        const storedFlag = localStorage.getItem('isPlug');
        obj.isPlug = storedFlag === 'true';
      }
    
      if (obj.profile_type === undefined) {
        obj.profile_type = obj.isPlug ? 1 : 2;
      }
      return obj;
    } catch {
      return {};
    }
  };
  
  export const saveServices = (obj) => {
    localStorage.setItem('services', JSON.stringify(obj));
    if (obj.isPlug !== undefined) {
      localStorage.setItem('isPlug', obj.isPlug.toString());
    }
  };
  