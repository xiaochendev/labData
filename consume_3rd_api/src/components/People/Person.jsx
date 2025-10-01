export default function Person({name, birth_year, eye_color, filmTitles}) {
    return (
        <div className="person">
            <h3>Name: {name}</h3>
            <p>Birth: {birth_year}</p>
            <p>Eye Color: {eye_color}</p>
              <div>
                <strong>Films:</strong>
                      <ul>
                          {filmTitles.map((title, i) => (
                              <li key={i}>{title}</li>
                          ))}
                      </ul>
                  </div>
            </div>
    )
}