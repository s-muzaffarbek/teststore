from datetime import datetime
from gettext import gettext

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect

from store import settings
from users import utils
from users.models import User, Address


def login_user(request):
    messages = []
    if not request.user.is_authenticated:
        if request.POST:
            phone = utils.clear_phone_number(request.POST['phone'])
            password = request.POST['password']
            user = authenticate(request, phone=phone, password=password)

            if user is not None:
                request.session.pop('errors', None)
                if not request.POST.get('remember_me', None):
                    request.session.set_expiry(0)

                login(request, user)

                return_url = request.POST.get('return_url', '')
                if return_url != '':
                    return redirect(return_url)

                return redirect(settings.LOGIN_REDIRECT_URL)

            else:
                messages.append(gettext("Wrong phone number or password."))
                return_url = request.POST.get('return_url', '')
                if return_url != '':
                    request.session['errors'] = messages
                    return redirect(return_url)

                return render(request, "users/login2.html", {'errors': messages, 'phone': phone, 'login': True})
        else:
            return render(request, "users/login2.html", {'login': True})
    else:
        return redirect(settings.LOGIN_REDIRECT_URL)

def logout_user(request):
    logout(request)
    return redirect(settings.LOGOUT_REDIRECT_URL)

def register_user(request, pytz=None):
    messages = []

    if request.user.is_authenticated:
        return redirect(settings.LOGIN_REDIRECT_URL)

    if request.method == "GET":
        return render(request, "users/login2.html", {'register': True})

    if request.method == "POST":
        phone = utils.clear_phone_number(request.POST['phone'])
        user, ucreated = User.objects.get_or_create(phone=phone)
        if ucreated:
            user.is_customer = True
            user.save()
        now = datetime.now(pytz.timezone('Asia/Tashkent'))
        # code, created = user_models.CodeConfirmation.objects.get_or_create(user=user)
        # code.status = user_models.QUEUED
        # code.code = account_activation_token.make_integer_token()
        # code.code_token = account_activation_token.make_char_token()
        # code.created_date = now
        # code.expiration_date = now + timedelta(minutes=10)
        # code.save()
        # smstext = f'There will be sms template... and shortcode: {code.code}'
        # if not SmsService().send_sms(phone, smstext):  # sms sends here
        #     error = [gettext('Something went wrong. Please try again later.')]
        #     return render(request, "users/login2.html", {'errors': 'error', 'register': True,
        #                                                  'phone': request.POST['phone']})
        # print(code.code, code.code_token, 'created', created)
        return render(request, "users/confirmation.html", {'created': ucreated, 'code': 'code',
                                                           'phone': request.POST['phone'], })

@login_required
def myaccount(request):
    return render(request, "users/user-dashboard.html")


@login_required
def profile(request):
    current_user: User = request.user

    if request.method == "POST":
        if request.POST.get('first_name'):
            current_user.first_name = request.POST['first_name']
        if request.POST.get('last_name'):
            current_user.last_name = request.POST['last_name']
        # if request.POST.get('email'):
        #     current_user.email = request.POST['email']
        if utils.clear_phone_number(request.POST.get('phone')):
            current_user.phone = utils.clear_phone_number(request.POST['phone'])
        # if request.POST.get('note'):
        #     current_user.note = request.POST['note']
        if request.POST.get('gender'):
            current_user.gender = request.POST['gender']
        current_user.save()

    return render(request, "users/user-profile.html", {'current_user': current_user})


@login_required
def address_list(request):
    user: User = request.user
    if request.GET.get('remove') and request.GET.get('address_id'):
        try:
            address_id = int(request.GET.get('address_id'))
            address = user.user_addresses.get(id=address_id)
            address.delete()
            return JsonResponse({'ok': True, 'msg': 'Address deleted succesfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'ok': False, 'error': 'Something went wrong. Please, try again later.'})

    return render(request, "users/user-address-list.html", {'current_user': user})

@login_required
def address_edit(request, address_id=None):
    current_user: User = request.user
    address_item = None
    if address_id:
        address_item: Address = current_user.user_addresses.get(id=address_id)

    if request.method == "POST":
        if not address_item:
            address_item = Address(user=request.user)
        address_item.region = request.POST['region']
        address_item.city = request.POST['city']
        address_item.street_address_1 = request.POST['street_address_1']
        # address_item.street_address_2 = request.POST['street_address_2']
        address_item.phone = utils.clear_phone_number(request.POST['phone'])
        address_item.note = request.POST['note']
        # address.user_id = request.POST['user_id']
        address_item.save()

        return redirect('address_list')

