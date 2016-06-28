# 	Ova skripta mora stajati u istom direktorijumu kao manage.py,
#	models.py mora biti u direktorijumu svoje aplikacije!
import sys, inspect, os



SOURCE = 'C:\Users\Aleksandar\Documents\GitHub\web_servisi_projekat\pinfweb\pinfweb\\fakturisanje\models.py'
APP_NAME = SOURCE.split('\\')[-2]
PROJECT_NAME = SOURCE.split('\\')[-3]
MODULE_REF = APP_NAME + '.models'

clsmembers = inspect.getmembers(sys.modules[MODULE_REF], inspect.isclass)

serializer_file_string = ''
serializer_file_string += "from rest_framework import serializers"
serializer_file_string += "\nfrom " + SOURCE.split('\\')[-2] + ".models import *\n\n"

for i in range(len(clsmembers)):
	if clsmembers[i][0].lower().find('django') == -1 and clsmembers[i][0].lower().find('user') == -1:
		serializer_file_string += "class " + clsmembers[i][0] + "Serializer(serializers.ModelSerializer):"
		fields = clsmembers[i][1]._meta.fields
		for j in range(len(fields)):
				if fields[j].rel and fields[j].rel != None:
					serializer_file_string += "\n    " + fields[j].name + " = serializers.PrimaryKeyRelatedField("
					serializer_file_string += "  queryset = " + fields[j].rel.to.__name__ + ".objects.all() "
					if fields[j].null == True and fields[j].blank == True:
						serializer_file_string +=", required = False)"
					else:
						serializer_file_string +=")"
		serializer_file_string += "\n    class Meta:\n        model = " + clsmembers[i][0]
		serializer_file_string += "\n        fields = \'__all__\'"
		serializer_file_string += "\n        depth = 1\n\n\n"

views_file_string = ''
views_file_string += "from " + APP_NAME + ".serializers import *\n"
views_file_string += "from rest_framework.decorators import api_view\n"
views_file_string += "from rest_framework.response import Response\n"
views_file_string += "from rest_framework.reverse import reverse\n"
views_file_string += "from rest_framework import viewsets\n\n"

for i in range(len(clsmembers)):
	if clsmembers[i][0].lower().find('django') == -1 and clsmembers[i][0].lower().find('user') == -1:
	
		views_file_string += "class " + clsmembers[i][0] + "ViewSet(viewsets.ModelViewSet):\n"
		views_file_string += "    queryset = " + clsmembers[i][0] + ".objects.all()\n"
		views_file_string += "    serializer_class = " + clsmembers[i][0] + "Serializer\n\n\n"

	views_file_string += "@api_view(['GET'])\n"
	views_file_string += "def api_root(request, format = None):\n"
	views_file_string += "    return Response({\n"
for i in range(len(clsmembers)):
	if clsmembers[i][0].lower().find('django') == -1 and clsmembers[i][0].lower().find('user') == -1:
	
		views_file_string += '\'' + clsmembers[i][0].lower() + "\': reverse(\'" + clsmembers[i][0].lower() + "-list\', request = request, format = format),\n"

views_file_string += "})\n\n\n"

project_urls_file_string = ''
project_urls_file_string += "from django.conf.urls import url, include\n"
project_urls_file_string += "from " +APP_NAME +" import views\n"
project_urls_file_string += "from rest_framework.routers import DefaultRouter\n\n"
project_urls_file_string += "router = DefaultRouter()\n"
for i in range(len(clsmembers)):
	if clsmembers[i][0].lower().find('django') == -1 and clsmembers[i][0].lower().find('user') == -1:
		project_urls_file_string += "router.register(r\'" + clsmembers[i][0].lower() + "\', views." + clsmembers[i][0] + "ViewSet)\n"

project_urls_file_string += "\n\nurlpatterns = [\n"
project_urls_file_string += "    url(r\'^\', include(router.urls)),\n"
project_urls_file_string += "    url(r\'^api-auth/\', include(\'rest_framework.urls\', namespace=\'rest_framework\'))\n]"


f = open( APP_NAME + "/serializers.py", "w" )
f.write(serializer_file_string)
f.close()
f2 = open( APP_NAME + "/views.py", "w" )
f2.write(views_file_string)
f2.close()
f3 = open( PROJECT_NAME + "/urls.py", "w" )
f3.write(project_urls_file_string)
f3.close()
print 'Files generated!'
