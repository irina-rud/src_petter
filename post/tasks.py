from django.core.mail import send_mail

from application.celery import app


@app.task
def send_email_notification(to, subject, text):
    print to + " " + subject
    send_mail(subject, text, 'petterpet_no_reply@mail.ru', [to], fail_silently=False)
