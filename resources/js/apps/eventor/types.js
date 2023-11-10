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

    static getAccess(allowLevel = 3){
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

    static getDataType(val)
    {
      for (let i = 0 ; i < EventorTypes.DataTypes.length; i++){
        if (val == EventorTypes.DataTypes[i].value){
          return EventorTypes.DataTypes[i];
          break;
        }
      }
      return null;
    }

    static DataTypes = [
      { value : '1' ,  name: 'Event', class : 'evt-event-color', cardClass : 'evt-type-event', state : 1 , icon: 'image'},
      { value : '2' ,  name: 'Action', class : 'evt-action-color', cardClass : 'evt-type-action', state : 1 , icon: 'crosshairs'},
      { value : '3' ,  name: 'Note', class : 'evt-note-color', cardClass : 'evt-type-note', state : 1, icon: 'pencil' },
      { value : '4' ,  name: 'Task', class : 'evt-task-color', cardClass : 'evt-type-task', state : 1, icon: 'bell' },
      { value : '5' ,  name: 'synopsis', class : 'evt-synopsis-color', cardClass : 'evt-type-synopsis', state : 1, icon: 'commenting' },
      { value : '6' ,  name: 'Info', class : 'evt-info-color', cardClass : 'evt-type-info', state : 1 , icon: 'info'},
      { value : '7' ,  name: 'Event', class : 'evt-event-color', cardClass : 'evt-type-type', state : 0, icon: 'bag' },
      { value : '8' ,  name: 'Event', class : 'evt-event-color', cardClass : 'evt-type-type', state : 0, icon: 'mail' },
    ]
}