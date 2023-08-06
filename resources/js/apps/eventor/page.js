class Page {

    static eventPool(content = ''){
        const eventPoolDiv = document.createElement('div');

        // Set the id attribute to 'eventpool'
        eventPoolDiv.id = 'eventPool';

        // Optionally, you can add some content to the div if needed
        eventPoolDiv.textContent = content;
        return eventPoolDiv;
    }
}