const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('fileUpload');
        const progressBar = document.getElementById('progress-bar');
        const progressContainer = document.getElementById('progress-container');
        const fileNameDisplay = document.getElementById('file-name');
        const fileSizeDisplay = document.getElementById('file-size');
        const cancelButton = document.getElementById('cancel-button');
        let xhr;

        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');

            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFiles(fileInput.files);
            }
        });

        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });

        cancelButton.addEventListener('click', () => {
            if (xhr) {
                xhr.abort();
                resetProgress();
            }
        });

        function handleFiles(files) {
            const file = files[0];
            fileNameDisplay.textContent = file.name;
            fileSizeDisplay.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' МБ';
            progressContainer.style.display = 'block';

            const formData = new FormData();
            formData.append('fileUpload', file);

            xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    progressBar.style.width = percentComplete - 5 + '%';
                }
            };

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('Файл успешно загружен');
                } else {
                    console.error('Ошибка загрузки файла');
                }
            };

            xhr.onerror = function () {
                console.error('Ошибка сети');
            };

            xhr.onabort = function () {
                console.log('Загрузка отменена');
                resetProgress();
            };

            xhr.send(formData);
        }

        function resetProgress() {
            progressBar.style.width = '0%';
            progressContainer.style.display = 'none';
            fileNameDisplay.textContent = '';
            fileSizeDisplay.textContent = '';
        }