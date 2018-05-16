#include <stdio.h>
#include <stdlib.h>

int main( int ac , char *av[] ){
	
	char line[10]="123";  
	fgets( line, 10, stdin );
	int num = atoi(line);
	printf("%d", num+1);
	return 0;

}
