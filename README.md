# Visual Conceptual Metaphor Explorer 
This tool allows the exploration of deconstructed infographics and categorized visual and conceptual metaphors in support of our work, The Language of Infographics: Toward Understanding Conceptual Metaphor Use in Scientific Storytelling  

This tool can be viewed online by following tis link http://127.0.0.1:5500/exploratoryTool/index.html


## Getting started 
1. `cd metaphorTool/exploratoryTool`
2. Start a local server. We tested with and recommend using Python Simple Server, which you can run in your terminal `python3 -m http.server --bind 127.0.0.1` (Mac/Linux) or `py -m http.server --bind 127.0.0.1` (Windows)
3. With your local server running, load the page at the following link address in your web browser of choice (we have tested on Chrome, Firefox, and Safari): [http://127.0.0.1:8000/](http://127.0.0.1:8000/). This will load in the explorer initialized with the infographics from the biomedical domain.


## Using the Visual Conceptual Metaphor Explorer
Use the top navigation menu (Biomedicine, Climate, Space, Anthropology) to explore within the different classified scientific domains. 

A spatiotemporal graph is placed on the left side (Infographic Spatio-Temporal Distribution section) and displays points that represent individual infographics (x axis= temporal coverage of infographic, y axis= spatial coverage of infographic). Some infographics (in biomedical, climate, space, and anthropology domains) span across several spatial scales, which are represented by beveled rectangles. Please note that the middle and right section will remain empty until a point (infographic) is chosen by hovering above it. 

Above the graph, Primary domain is stated once a point is selected (alongside the Secondary domain(s), if applicable).

Once a desired point (infographic) is chosen by hovering over it, Image Details section will appear in the middle including the embedded infographic, with image name, image author(s), and the domain distribution above the infographic image. A source URL link appears below the infographics image. Due to copyright reasons, some infographics could not be embedded. Please follow the URL link provided to reach the original source site. 

On the right side (Conceptual Metaphor Analysis section) the chosen infographics is visually analyzed with a bar chart showing the number of visual conceptual metaphors used. The text below identifies describes the different types of metaphors identified in the infographic, including whether a textual metaphor is present and what type. 


