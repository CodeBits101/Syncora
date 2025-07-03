const content = {
  title: {
    en: "Our Team",
    hi: "हमारी टीम",
    de: "Unser Team",
    fr: "Notre équipe",
    mr: "आमची टीम"
  },
  
  heading: {
    en: "Meeting our team members",
    hi: "हमारी टीम के सदस्यों से मिलिए",
    de: "Lernen Sie unsere Teammitglieder kennen",
    fr: "Rencontrez les membres de notre équipe",
    mr: "आमच्या टीमच्या सदस्यांची भेट घ्या"
  },

  description: {
    en: "This task management application is designed specifically for IT organizations, aligning with industry workflows and the Software Development Life Cycle (SDLC). Built on the AGILE methodology, it enables teams to efficiently manage tasks, track progress, and collaborate seamlessly. The application ensures streamlined task handling, fostering adaptability and iterative development, making it an essential tool for IT project management.",
    hi: "यह कार्य प्रबंधन एप्लिकेशन विशेष रूप से आईटी संगठनों के लिए डिज़ाइन किया गया है, जो उद्योग वर्कफ़्लो और सॉफ्टवेयर डेवलपमेंट लाइफ साइकिल (SDLC) के साथ संरेखित है। AGILE पद्धति पर आधारित यह टीमों को कार्यों का कुशलतापूर्वक प्रबंधन करने, प्रगति को ट्रैक करने और सहजता से सहयोग करने में सक्षम बनाता है। यह एप्लिकेशन कार्य प्रबंधन को सरल बनाता है, अनुकूलता और क्रमिक विकास को बढ़ावा देता है, जिससे यह आईटी परियोजना प्रबंधन के लिए एक आवश्यक उपकरण बन जाता है।",
    de: "Diese Aufgabenverwaltungsanwendung wurde speziell für IT-Organisationen entwickelt und entspricht den Branchenabläufen und dem Software Development Life Cycle (SDLC). Basierend auf der AGILE-Methodik ermöglicht sie Teams, Aufgaben effizient zu verwalten, den Fortschritt zu verfolgen und nahtlos zusammenzuarbeiten. Die Anwendung sorgt für eine reibungslose Aufgabenverwaltung, fördert Anpassungsfähigkeit und iterative Entwicklung und ist damit ein unverzichtbares Werkzeug für das IT-Projektmanagement.",
    fr: "Cette application de gestion de tâches est spécialement conçue pour les organisations informatiques, en adéquation avec les flux de travail du secteur et le cycle de vie du développement logiciel (SDLC). Basée sur la méthodologie AGILE, elle permet aux équipes de gérer efficacement les tâches, de suivre les progrès et de collaborer sans effort. L'application garantit une gestion fluide des tâches, favorisant l'adaptabilité et le développement itératif, en faisant un outil essentiel pour la gestion de projets informatiques.",
    mr: "ही टास्क मॅनेजमेंट अ‍ॅप्लिकेशन खास IT संस्थांसाठी डिझाइन केली आहे, जी इंडस्ट्री वर्कफ्लो आणि सॉफ्टवेअर डेव्हलपमेंट लाइफ सायकल (SDLC) शी सुसंगत आहे. AGILE कार्यपद्धतीवर आधारित ही अ‍ॅप्लिकेशन टीम्सना कार्ये प्रभावीपणे व्यवस्थापित करणे, प्रगती ट्रॅक करणे आणि सहज सहकार्य करणे शक्य करते. ही अ‍ॅप्लिकेशन कार्य सुलभ करते, जुळवून घेण्याची क्षमता आणि पुनरावृत्ती विकासाला प्रोत्साहन देते, ज्यामुळे ही IT प्रकल्प व्यवस्थापनासाठी एक आवश्यक साधन ठरते."
  }
};



const  getContentByLanguage = (langKey) => {
  const fallback = 'en';

  return {
    title: content.title[langKey] || content.title[fallback],
    heading: content.heading[langKey] || content.heading[fallback],
    description: content.description[langKey] || content.description[fallback]
  };
}

export default getContentByLanguage ; 