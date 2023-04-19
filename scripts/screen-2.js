axios.defaults.headers.common['Authorization'] = 'ylQIQq1xH2RbNTiDYd7ky2cm';

const getQuizz = id => {
	const quizz = document.querySelector('.quizz-t2');
	axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/' + id)
		.then(response => {
			const { title, image, questions } = response.data;
			const banner = document.createElement('div');
			banner.classList.add('banner-t2', 'center');
			banner.setAttribute('data-test', 'banner');
			banner.innerHTML += `<img src="${image}"><h2>${title}</h2>`;
			quizz.appendChild(banner);
			questions.forEach(({ title, color, answers }) => {
				const question = document.createElement('div');
				const question_title = document.createElement('h3');
				question_title.setAttribute('data-test', 'question-title');
				question_title.classList.add('center');
				question_title.style.backgroundColor = color;
				question_title.textContent = title;

				question.setAttribute('data-test', 'question');
				question.classList.add('question-t2');
				question.appendChild(question_title);
				answers.sort(() => Math.random() - 0.5).forEach(({ text, image, isCorrectAnswer }) => {
					const answer = document.createElement('div');
					const answer_text = document.createElement('p');
					answer_text.setAttribute('data-test', 'answer-text');
					answer_text.textContent = text;

					answer.setAttribute('data-test', 'answer');
					answer.classList.add('answer-t2');

					answer.innerHTML = `<img src="${image}">`;
					answer.appendChild(answer_text);
					question.appendChild(answer);
				});
				quizz.appendChild(question);
			});

		}).catch(error => console.error(error));
};

// getQuizz(3);


























