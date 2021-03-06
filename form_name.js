(function($) {
    $(document).ready(function() {

        /**
         * Проверяет форму для ввода имени пользователя на ошибки.
         *
         * Использовать:
         *  var Name = new Form_name();
         *  Name.id( 'name' );// id формы для ввода имени пользователя.
         *  Name.submitId( 'sub' );id кнопки для отправки формы.
         *  Name.init();// Инициализация.
         *
         * Мин. использование:
         *  var Name = new Form_name();
         *  Name.id( 'name' );
         *  Name.init();
         *
         * Дополнительные возможности:
         *  - очистка формы: Name.clear();
         */
		
		var Form_name = function() {

			// -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            var name, submit_id, clear_id;

            // Указывает на потерю фокуса.
            var focus = false;

            /**
             * Показывает ошибки.
             */
            function setError( text ) {
                name.parent().next().removeClass( 'confirm' ).addClass( 'error' ).text( text );
            }

            /**
             * Очишает ошибки и любые надписи.
             */
            function errorOff() {
                name.parent().next().removeClass( 'error' ).replaceWith( '<li class="label">&nbsp;</li>' );
            }

            /**
             * Показывает утверждение.
             */
            function setConfirm( text ) {
                name.parent().next().removeClass( 'error' ).addClass( 'confirm' ).text( text );
            }

            /**
             * Очищает форму.
             */
            function clearform() {
                name.val('');
                errorOff();
            }

			return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                /**
                 * id поля для ввода имени.
                 */
                id: function( id_name ) {
                    name = $( '#' + id_name );
                },

                /**
				 * id кнопки после нажатия которой будет произведена проверка поля на ошибки.
                 */
				submitId: function( id_submit ) {
                    submit_id = $( '#' + id_submit );
                },

                /**
                 * id объекта по щелчку на котором очищает форму.
                 */
                clearId: function( id_clear ) {
                    clear_id = $( '#' + id_clear );
                },

                /**
                 * Инициализация.
                 */
                init: function() {

                    /**
                     * Событие - нажата клавиша вернулась в отжатое (нормальное) состояние.
                     */
                    name.on('keyup', function( eventObj ) {
                        var str = $( this ).val();
                        if ( str.length > 0 ) {
                            // Проверка на символы пунктуации.
                            if ( str.search( /[!@#$%^&*()<>~'"`:;]/ ) + 1 ) {
                                var arr_simbol = str.match( /[!@#$%^&*()<>~'"`:;]$/ );
                                setError( 'Символ ' + arr_simbol[0] + ' недопустим!' );
                            }
                            else if ( str.search( /^[\S]{1,2}$/i ) + 1 ) {
                                setError( 'Имя слишком короткое!' );
                            }
                            else setConfirm( 'Все верно' );
                        }
                        else errorOff();
                    });
                    
                    /**
                     * Событие - поле в фокусе.
                     */
                    name.on('focus', function( eventObj ) {
						focus = true;
					});

					/**
                     * Событие - потеря фокуса.
                     */
                    name.on('focusout', function( eventObj ) {
						if ( focus == true ) {
							var str = $( this ).val();
							if ( str.length == 0 ) setError( 'Поле обязательно для заполнения!' );
						}
					});

                    /**
                     * Событие - щелчок по кнопке.
                     */
                    submit_id.on('click', function( eventObj ) {
                        if ( name.parent().next().hasClass( 'error' ) ) {
                            eventObj.preventDefault();
                            submit_id.trigger( 'errorform' );
                        }
                    });

                    /**
                     * Событие - щелчок по объекту очистки формы.
                     */
					clear_id.on('click', function( eventObj ) {
						eventObj.preventDefault();
						clearform();
					});

                },

                /**
                 * Очистка формы.
                 */
                clear: function() {
                    clearform();
                },

			};
		};

	});
})(jQuery);





