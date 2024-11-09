export const util = {
  FormDataToJSON: (formData: FormData): { [key: string]: string } => {
    const obj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      obj[key] = value as string;
    });
    return obj;
  },

  FileToBase64: (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  },

  saveLocalStorage: async (key: string, token: string): Promise<void> => {
    localStorage.setItem(key, token);
  },

  getLocalStorage: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  logout: (): void => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = '/';
  },

  formatDateTime: (isoString: string): string => {
    const createdAtDate = new Date(isoString);
    const now = new Date();

    const timeDifference = now.getTime() - createdAtDate.getTime();
    const seconds = Math.floor(timeDifference / 1000); // 1 segundo = 1000 milisegundos
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      if (seconds === 1) {
        return `hace ${seconds} segundo`;
      }
      return `hace ${seconds} segundos`;
    } else if (minutes < 60) {
      if (minutes === 1) {
        return `hace ${minutes} minuto`;
      }
      return `hace ${minutes} minutos`;
    } else if (hours < 24) {
      if (hours === 1) {
        return `hace ${hours} hora`;
      }
      return `hace ${hours} horas`;
    } else {
      if (days === 1) {
        return `hace ${1} día`;
      }
      return `hace ${days} días`;
    }
  },
};
