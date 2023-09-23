class EventorTypes
{
    static GetNewTask()
    {
        const task = {
            user: 0,
            action: 0,
            type: "",
            objects: [],
            where: [],
            order: "",
            setKey: "",
            limit: 0,
            offset: 0,
            postActions: [],
            results: [],
        };
        return task;
    }

    static getAccess(allowLevel = 2){
        const access = [
            { value: '0', label: 'Private' },
            { value: '1', label: 'Restricted' },
            { value: '2', label: 'Public' },
            { value: '3', label: 'Official' },
          ];
          let array = [];
          for (let i = 0; i <= allowLevel; i++) {
            const element = access[i];
            if (element != null){
                array.push(element);
            }
          }
          return array;
    }
  
    static getStatus(){
      const status = [
        { value: '0', label: 'Inactive' },
        { value: '1', label: 'Active' },
        { value: '2', label: 'Archieved' },
      ];
      return status;
    }
}