import uuid
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from users.regions import REGIONS, CITIES

def get_token():
    return str(uuid.uuid4())


class User(AbstractUser):
    email = models.EmailField(null=True)
    username = models.CharField(max_length=12, null=True, blank=True)
    phone = models.CharField(max_length=13, unique=True, help_text="Example: 99890123456")
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    is_active = models.BooleanField(default=True)
    is_customer = models.BooleanField(default=True)
    is_merchant = models.BooleanField(default=False)
    token = models.UUIDField(default=get_token, editable=False, unique=True)
    is_staff = models.BooleanField(default=False)
    note = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)

    USERNAME_FIELD = 'phone'
    objects = UserManager()

    def __str__(self) -> str:
        return self.get_full_name()


class Address(models.Model):
    user = models.ForeignKey(User, related_name='user_addresses',
                             on_delete=models.CASCADE, default=1)
    is_primary = models.BooleanField(default=False)
    city = models.CharField(max_length=256, blank=True)
    region = models.CharField(max_length=256, choices=REGIONS['uz'], blank=True)
    street_address_1 = models.CharField(max_length=256, blank=True)
    street_address_2 = models.CharField(max_length=256, blank=True, null=True)
    phone = models.CharField(max_length=13, blank=True)
    note = models.CharField(max_length=1024, blank=True)

    def get_region(self):
        try:
            return REGIONS['uz'][int(self.region) - 1][1]
        except Exception as e:
            print(e)
            return self.region

    def get_regions(self):
        try:
            return {'uz': REGIONS['uz'][int(self.region) - 1][1], 'ru': REGIONS['ru'][int(self.region) - 1][1]}
        except Exception as e:
            print(e)
            return self.region

    def get_city(self):
        try:
            return CITIES['uz'][self.region][self.city]
        except Exception as e:
            print('er', e)
            return self.city

    def get_cities(self):
        try:
            return {'uz': CITIES['uz'][self.region][self.city], 'ru': CITIES['ru'][self.region][self.city]}
        except Exception as e:
            print('er', e)
            return self.city

    def __str__(self):
        return f"{self.get_region()} {self.get_city()} {self.street_address_1}"

